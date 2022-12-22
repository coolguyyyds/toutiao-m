import request from '@/utils/request'
/**
 * 获取评论列表
 */
export const getCommentList = params => request({
  method: 'GET',
  url: '/v1_0/comments',
  params
})
/**
 * 评论点赞
 */
export const commentLike = target => request({
  method: 'POST',
  url: '/v1_0/comment/likings',
  data: {
    target
  }
})
/**
 * 取消评论点赞
 */
export const cancelCommentLike = target => request({
  method: 'DELETE',
  url: `/v1_0/comment/likings/${target}`
})
/**
 * 添加评论或回复评论
 */
export const addComment = data => request({
  method: 'POST',
  url: '/v1_0/comments',
  data
})
