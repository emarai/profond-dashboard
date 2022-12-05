// @ts-nocheck
import axios from 'axios'
import NodeCache from 'node-cache'
const lambdaUrl =
    'https://dh4qqgrzfkhpjhok5pu2himtxy0vmfzw.lambda-url.ca-central-1.on.aws/'

const newsCache = new NodeCache()

export default async function handler(req, res) {
    const cache = newsCache.get('news')
    let news = cache
    if (!cache) {
        const originalSource = await axios.get(lambdaUrl)
        newsCache.set('news', originalSource.data, 60 * 5)
        news = originalSource.data
    }
    res.status(200).json(news)
}
