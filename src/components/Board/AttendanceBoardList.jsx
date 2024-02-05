import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import AttendanceBoardListItem from "./AttendanceBoardListItem";

const AttendanceBoardList = () => {
  const user = auth.currentUser;
  const [attends, setAttends] = useState([]);

  useEffect(() => {
    const fetchAttend = async () => {
      const attendQuery = query(
        collection(db, `attendance`),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      const unsubscribe = await onSnapshot(attendQuery, (snapshot) => {
        const attends = snapshot.docs.map((doc) => {
          const { content, createdAt, startdate, enddate, select, title, userId, username } =
            doc.data();
          return {
            content,
            createdAt,
            startdate,
            enddate,
            select,
            title,
            userId,
            username,
            id: doc.id,
          };
        });
        setAttends(attends);
      });
      return () => unsubscribe();
    };
    fetchAttend();
  }, []);
  return (
    <div className={"list mt30"}>
      <ul className={"board"}>
        {attends.map((attend) => (
          <AttendanceBoardListItem key={attend.id} {...attend} />
        ))}
      </ul>
    </div>
  );
};

export default AttendanceBoardList;
