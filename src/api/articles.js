import request from '@/utils/request'
/**
 * 获取文章
 */
export const getArticles = (params) => request({
  method: 'GET',
  url: 'v1_0/articles',
  params
})
/**
 * 获取文章详情
 */
export const getArticlesDetail = (articleId) => request({
  method: 'GET',
  url: `/v1_0/articles/${articleId}`
})
/**
 * 收藏文章
 */
export const collectArticle = target => request({
  method: 'POST',
  url: '/v1_0/article/collections',
  data: {
    target
  }
})
/**
 * 取消收藏文章
 */
export const cancelArticle = target => request({
  method: 'DELETE',
  url: `/v1_0/article/collections/${target}`
})
/**
 * 点赞文章
 */
export const likeArticle = target => request({
  method: 'POST',
  url: '/v1_0/article/likings',
  data: {
    target
  }
})
/**
 * 取消点赞文章
 */
export const cancelLikeArticle = target => request({
  method: 'DELETE',
  url: `/v1_0/article/likings/${target}`
})
