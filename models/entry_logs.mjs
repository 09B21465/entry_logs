import { Schema, model } from "mongoose";

/*
enum: 
    inRoom: 在室
    seminar: ゼミ
    lecture: 講義
    outOfOffice: 外出
    businessTrip: 出張
    meeting: 会議
    goneHome: 帰宅
    back: 戻る
**/

const entrySchema = Schema({
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["inRoom","seminar","lecture","outOfOffice","businessTrip","meeting","goneHome","back"]
    },
    status_changed_at: {
        type: Date,
        required: true
    }
}, {timestamps: true});
const EntryLogs = model("entry_logs", entrySchema);
export default EntryLogs;