import db from "./firebase"

export const subjects_get = async () => {
    // ["ie3", "fu04", "cn02"]: Array<string>
    const ref = db.collection("subject").doc("subject")

    const data = await ref.get()

    return data.data().subject
}