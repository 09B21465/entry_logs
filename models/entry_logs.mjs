import { Schema, model } from "mongoose";

const entrySchema = Schema({
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    status_changed_at: {
        type: Date,
        required: true
    }
}, {timestamps: true});
const EntryLogs = model("entry_logs", entrySchema);
export default EntryLogs;