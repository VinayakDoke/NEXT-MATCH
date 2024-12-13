import React from 'react'
import ListsTab from './ListsTab'
import { fetchCurrentUserLikeIds, fetchLikedMembers } from '../actions/likeActions'

export default async function page({searchParams}:{searchParams:{type:string}}) {
    const likeIds=await fetchCurrentUserLikeIds();
    const members=await fetchLikedMembers(searchParams.type);
  return (
    <div>{members&&likeIds&&<ListsTab likeIds={likeIds} members={members}/>}</div>
  )
}
