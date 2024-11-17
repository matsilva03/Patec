import { useEffect, useState } from 'react'
import api from '@/config/api'

interface Student {
  id: number
  ra: string
  name: string
  email: string
  profile : string
  password : string
}

export default function useStudents() {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    api.get('/users').then((response) => {
      setStudents(response.data)
    })
  }, [])

  return { students, setStudents }
}
