import Head from 'next/head'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { field_get } from '../apis/field_get'
import { subjects_get } from '../apis/subjects_get'
import styles from '../styles/Home.module.css'
import SelectLabels from '../components/SelectLabels'
import ButtonAppBar from '../components/ButtonAppBar'
import { Button } from '@material-ui/core'
import { test_post } from '../apis/test_post'
import { test_get } from '../apis/test_get'
import { test_object } from '../interfaces/test_get_type'
import { useRouter } from 'next/router'
import DataTable from '../components/DataTable'


export const GoRouter = () => {


  const [goPath, setGoPath] = useState<string>(null)

  const router = useRouter()
  useEffect(() => {
    if (goPath) {
      router.push(goPath)
      setGoPath(null)
    }
  }, [goPath])

  return setGoPath
}

export default function Home() {

  // states

  const [subject, setSubject] = useState<string[]>([])
  const [field, setField] = useState<string[]>([])
  const types = ["期末", "中間", "対策", "レポート", "集約フォルダ"]

  const [search__subject_data, setSearch_subject_data] = useState<string>("*")
  const [search__field_data, setSearch_field_data] = useState<string>("*")
  const [search__type_data, setSearch_type_data] = useState<number>(0)

  const [tests, setTest] = useState<any>([])

  const setGo = GoRouter()

  // react query

  const { data: subjects_data, isLoading: subjects_isLoading, remove: subjects_remove } = useQuery('subjects_get', () =>
    subjects_get())

  const { data: field_data, isLoading: field_isLoading } = useQuery('field_get', () =>
    field_get())


  const {
    mutate: fetch_test_mutation,
  } = useMutation((_) => test_get(search__subject_data, search__field_data, search__type_data), {
    onSuccess: (res) => {
      // // メインページに遷移
      setTest(res)
    },
    onError: (errorMessage: string) => {
      alert("failed")
    }
  })


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

    <>
      <ButtonAppBar subjects_remove={subjects_remove}/>
      <div className={styles.container}>
        <Head>
          <title>hack the aidu</title>
          <meta name="description" content="examines examinations!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.flexerow}>
            <div className={styles.boxboxer}>
              <div className={styles.flexercol}>
                <div className={styles.textcenter}>
                  <div className={styles.ml}>
                    科目選択
                  </div>
                </div>
                <SelectLabels value={search__subject_data} items={subject} name="科目" onChange={(e) => setSearch_subject_data(e.target.value)} />
              </div>
            </div>

            <div className={styles.boxboxer}>
              <div className={styles.flexercol}>
                <div className={styles.textcenter}>
                  <div className={styles.ml}>
                    フィールド選択
                  </div>
                </div>
                <SelectLabels value={search__field_data} items={field} name="フィールド" onChange={(e) => setSearch_field_data(e.target.value)} />
              </div>
            </div>

            <div className={styles.boxboxer}>
              <div className={styles.flexercol}>
                <div className={styles.textcenter}>
                  <div className={styles.ml}>
                    種類選択
                  </div>
                </div>
                <SelectLabels value={types[search__type_data]} items={types} name="種類" onChange={(e) => setSearch_type_data(types.indexOf(e.target.value))} />
              </div>
            </div>

            <div className={styles.marg}>
              <Button className={styles.clickme}>
                <div
                  className={styles.boxboxergo}
                  onClick={() => {
                    fetch_test_mutation()
                    console.log(search__subject_data, search__field_data, search__type_data)
                  }}>
                  <div className={styles.flexercol}>
                    <div className={styles.textcenter}>
                      検索
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          <DataTable test={tests} fetch_test_mutation={fetch_test_mutation} />
        </main>

      </div>
    </>
  )
}
