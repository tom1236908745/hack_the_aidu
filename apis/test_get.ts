import { test_kind_enum } from "../interfaces/test_get_type"
import db from "./firebase"

export const test_get = async (subject: string, field: string, kind: test_kind_enum) => {
    // [{}]: Array<test_object>

    const ref: any = db.collection("test")
    const data = await ref.where('subject', '==', subject).where('field', '==', field).where('kind', '==', kind).get()
    const return_ary = []
    // const snapshot = await citiesRef.where('capital', '==', true).get();
    data.forEach(doc => {
        return_ary.push({ ...doc.data(), id: doc.id })
    })

    return return_ary
}