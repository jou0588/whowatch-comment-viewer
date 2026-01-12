const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // CORS設定
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // OPTIONSリクエストの処理
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // GETリクエストのみ許可
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    const { liveId } = req.query;
    const lastUpdatedAt = req.query.last_updated_at || 0;
    
    if (!liveId) {
        res.status(400).json({ error: 'liveId is required' });
        return;
    }
    
    try {
        const apiUrl = `https://api.whowatch.tv/lives/${liveId}?last_updated_at=${lastUpdatedAt}`;
        console.log(`[API] Fetching: ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }
        
        const data = await response.json();
        res.status(200).json(data);
        
    } catch (error) {
        console.error('[API] Error:', error);
        res.status(500).json({ 
            error: 'プロキシエラー', 
            message: error.message 
        });
    }
};