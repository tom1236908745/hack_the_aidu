import db from "./firebase"

export const field_get = async () => {
    // ["c1-c2", "c3-c4", "sy"]: Array<string>
    const ref = db.collection("field").doc("field")
    const data = await ref.get()
    return data.data().field
}