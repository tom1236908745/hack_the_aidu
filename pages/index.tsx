import Head from 'next/head'
import { useEffect } from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { field_get } from '../apis/field_get'
import { subjects_get } from '../apis/subjects_get'
import styles from '../styles/Home.module.css'
import ButtonAppBar from '../components/ButtonAppBar'
import SelectLabels from '../components/SelectLabels'
import Header from '../components/Header'
export default function Home() {

  const [subject, setSubject] = useState<string[]>([])
  const [field, setField] = useState<string[]>([])

  const [search__subject_data, setSearch_subject_data] = useState<string>("fu09")
  const [search__field_data, setSearch_field_data] = useState<string>("c1-c2")

  const { data: subjects_data, isLoading: subjects_isLoading } = useQuery('subjects_get', () =>
    subjects_get())

  const { data: field_data, isLoading: field_isLoading } = useQuery('field_get', () =>
    field_get())


  useEffect(() => {
    if (subjects_isLoading) {
      return
    } else {
      if (subjects_data) {
        setSubject(subjects_data)
      }
    }
  }, [subjects_isLoading])

  useEffect(() => {
    if (field_isLoading) {
      return
    } else {
      if (field_data) {
        setField(field_data)
      }
    }
  }, [field_isLoading])

  return (
    <div className={styles.container}>
      <Head>
        <title>hack the aidu</title>
        <meta name="description" content="examines examinations!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to hack the aidu
        </h1>
        <div>

          <SelectLabels value={search__subject_data} items={subject} name="教科" onChange={(e) => setSearch_subject_data(e.target.value)} />

          <SelectLabels value={search__field_data} items={field} name="フィールド" onChange={(e) => setSearch_field_data(e.target.value)} />

        </div>
        {/* <h1 className={styles.title}>
          {
            subject.map((st: string, key: number) => {
              return (
                <div key={key}>{st}</div>
              )
            })
          }
        </h1>
        <h1 className={styles.title}>
          {
            field.map((st: string, key: number) => {
              return (
                <div key={key}>{st}</div>
              )
            })
          }
        </h1> */}
      </main>

    </div>
  )
}
