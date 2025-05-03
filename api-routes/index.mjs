import express from "express";
import EntryLogs from "../models/entry_logs.mjs";

const router = express.Router();

router.get("/inout_table/entry_logs", async (req, res) => {
    try {
      const entries = await EntryLogs.find();
      res.json(entries);
      console.log("取得結果:", entries);
    } catch (err) {
        console.error("エラー : ", err);
        res.status(500).json({ error: err.message });
    }
  });
  

router.get("/inout_table/entry_logs/:id", async (req,res) => {
    try {
        const entries = await EntryLogs.findById(req.params.id);
        res.json(entries);
        console.log("取得結果:", entries);
      } catch (err) {
          console.error("エラー : ", err);
          res.status(500).json({ error: err.message });
      }
    console.log(`I'm get one router : ${req.params.id}`);
});

router.post("/inout_table/entry_logs",async (req,res) => {
    try {
        const newEntry = new EntryLogs({
          user_id: req.body.user_id,
          status: req.body.status,
          status_changed_at: new Date(req.body.status_changed_at),
        });
    
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
        console.log("新規登録:", savedEntry);
      } catch (err) {
        console.error("エラー : ",err);
        res.status(400).json({ error: err.message });
      }
    //console.log("I'm post router");
});

router.delete("/inout_table/entry_logs/:id",async (req,res) => {
    try {
        const deletedEntry = await EntryLogs.findByIdAndDelete(req.params.id);
    
        if (!deletedEntry) {
          return res.status(404).json({ msg: "対象データが見つかりません" });
        }
    
        res.json({ msg: "削除成功", deletedEntry });
        console.log("削除:", deletedEntry);
      } catch (err) {
        console.error("エラー:",err);
        res.status(500).json({ error: err.message });
      }
    console.log("I'm delete router");
});

router.patch("/inout_table/entry_logs/:id",async (req,res) => {
    try {
        const updatedEntry = await EntryLogs.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
    
        if (!updatedEntry) {
          return res.status(404).json({ msg: "対象データが見つかりません" });
        }
    
        res.json(updatedEntry);
        console.log("更新:", updatedEntry);
      } catch (err) {
        console.error("エラー",err)
        res.status(400).json({ error: err.message });
      }
    console.log("I'm patch router");
});

export default router;