class WhowatchCommentViewer {
    constructor() {
        this.liveId = null;
        this.lastUpdatedAt = 0;
        this.isRunning = false;
        this.commentCount = 0;
        this.pollInterval = null;
        this.pollDelay = 3000; // 3秒ごとにポーリング
        
        // Vercel環境でのAPI URL
        this.apiUrl = '/api/lives';
        
        this.initElements();
        this.attachEventListeners();
    }

    initElements() {
        this.liveIdInput = document.getElementById('liveIdInput');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.statusText = document.getElementById('statusText');
        this.commentsContainer = document.getElementById('commentsContainer');
        this.commentCountEl = document.getElementById('commentCount');
        this.viewerCountEl = document.getElementById('viewerCount');
        this.totalPointEl = document.getElementById('totalPoint');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.liveIdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.start();
        });
    }

    extractLiveId(input) {
        input = input.trim();
        
        // URLからIDを抽出
        const urlMatch = input.match(/whowatch\.tv\/viewer\/(\d+)/);
        if (urlMatch) {
            return urlMatch[1];
        }
        
        // 数字のみの場合
        if (/^\d+$/.test(input)) {
            return input;
        }
        
        return null;
    }

    async start() {
        const input = this.liveIdInput.value;
        this.liveId = this.extractLiveId(input);
        
        if (!this.liveId) {
            this.showError('有効な配信URLまたはLive IDを入力してください');
            return;
        }

        this.isRunning = true;
        this.commentCount = 0;
        this.lastUpdatedAt = 0;
        this.commentsContainer.innerHTML = '';
        
        this.startBtn.style.display = 'none';
        this.stopBtn.style.display = 'inline-block';
        this.liveIdInput.disabled = true;
        
        this.updateStatus('接続中...', false);
        
        // 最初のデータ取得
        await this.fetchComments();
        
        // 定期的にポーリング
        this.pollInterval = setInterval(() => this.fetchComments(), this.pollDelay);
    }

    stop() {
        this.isRunning = false;
        
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
            this.pollInterval = null;
        }
        
        this.startBtn.style.display = 'inline-block';
        this.stopBtn.style.display = 'none';
        this.liveIdInput.disabled = false;
        
        this.updateStatus('停止', false);
    }

    updateStatus(text, active = true) {
        this.statusText.textContent = text;
        if (active) {
            this.statusIndicator.classList.add('active');
        } else {
            this.statusIndicator.classList.remove('active');
        }
    }

    async fetchComments() {
        if (!this.isRunning) return;

        try {
            // Vercel Serverless Function経由でAPIにアクセス
            const url = `${this.apiUrl}?liveId=${this.liveId}&last_updated_at=${this.lastUpdatedAt}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // エラーレスポンスのチェック
            if (data.error) {
                throw new Error(data.message || 'APIエラー');
            }
            
            // 配信情報の更新
            if (data.live) {
                this.updateLiveInfo(data.live);
            }
            
            // コメントの処理
            if (data.comments && data.comments.length > 0) {
                // コメントを時系列順に表示（APIは新しい順で返す）
                const comments = data.comments.reverse();
                comments.forEach(comment => this.displayComment(comment));
                
                this.commentCount += comments.length;
                this.commentCountEl.textContent = this.commentCount;
            }
            
            // 最終更新時刻を更新
            if (data.updated_at) {
                this.lastUpdatedAt = data.updated_at;
            }
            
            this.updateStatus(`接続中 (Live ID: ${this.liveId})`, true);
            
        } catch (error) {
            console.error('Error fetching comments:', error);
            this.updateStatus(`エラー: ${error.message}`, false);
        }
    }

    updateLiveInfo(live) {
        if (live.viewer_count !== undefined) {
            this.viewerCountEl.textContent = live.viewer_count.toLocaleString();
        }
        
        if (live.total_point !== undefined) {
            this.totalPointEl.textContent = live.total_point.toLocaleString();
        }
    }

    displayComment(comment) {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment';
        
        const user = comment.user || {};
        const userName = user.name || '匿名';
        const userId = user.id || '';
        const message = comment.message || '';
        const createdAt = comment.created_at ? new Date(comment.created_at * 1000) : new Date();
        
        // ユーザー名の頭文字をアイコンに使用
        const initial = userName.charAt(0).toUpperCase();
        
        commentEl.innerHTML = `
            <div class="comment-header">
                <div class="user-icon">${initial}</div>
                <div>
                    <div class="user-name">${this.escapeHtml(userName)}</div>
                    <div class="user-id">ID: ${userId}</div>
                </div>
                <div class="comment-time">${this.formatTime(createdAt)}</div>
            </div>
            <div class="comment-message">${this.escapeHtml(message)}</div>
        `;
        
        this.commentsContainer.appendChild(commentEl);
        
        // 自動スクロール
        this.commentsContainer.scrollTop = this.commentsContainer.scrollHeight;
    }

    showError(message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'error';
        errorEl.textContent = message;
        
        this.commentsContainer.innerHTML = '';
        this.commentsContainer.appendChild(errorEl);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatTime(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    new WhowatchCommentViewer();
});