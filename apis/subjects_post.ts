import db from "./firebase"

export const subject_patch = async (new_subject: string) => {
    // once get current subject
    const _ref = db.collection("subject").doc("subject")
    const _data = await _ref.get()

    const old_subjects: string[] = _data.data().subject // string[]

    if (old_subjects.includes(new_subject)) {
        throw new Error('already the subject exists')
    }   
    old_subjects.push(new_subject)
    _ref
        .update({ subject: old_subjects }, { merge: true })
        .then(res => {
            return res
        })
}