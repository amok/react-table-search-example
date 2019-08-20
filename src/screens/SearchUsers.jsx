import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SearchForm from '../components/SearchForm'
import LoadingModal from '../components/LoadingModal'
import ContactsTable from '../components/ContactsTable'
import { users as Users } from '../ducks'
import { USER_STATUSES } from '../constants'

const SearchUsers = () => {
  const [filter, setFilter] = useState()
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(Users.list())
  }, [])

  useEffect(() => {
    dispatch(Users.list({ fullName: filter }))
  }, [filter])

  const onSubmit = useCallback(value => {
    setFilter(value)
  }, [])

  const onStatusChange = useCallback(value => {
    dispatch(Users.update({ id: value.id, data: { status: value.value } }))
  }, [])

  return (
    <div>
      <LoadingModal
        loading={users.loading || users.updating}
      />
      <SearchForm
        onSubmit={onSubmit}
      />
      <ContactsTable
        rows={users.data}
        statuses={Object.values(USER_STATUSES)}
        onStatusChange={onStatusChange}
      />
    </div>
  )
}

export default SearchUsers
