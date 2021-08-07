import { test_kind_enum, test_object } from "../interfaces/test_get_type"
import db from "./firebase"

export const test_fix = async (update_obj: test_object) => {
    
    const ref: any = db.collection("test").doc(update_obj.id)

    ref
        .update({ ...update_obj }, { merge: true })
        .then(res => {
            return res
        })
}