import { test_object } from "../interfaces/test_get_type"
import db from "./firebase";

export const test_post = async (test_obj: test_object) => {

    const res = await db.collection('test').add(test_obj)

}