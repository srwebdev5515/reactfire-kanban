import React, { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { useFirestore } from 'reactfire';


import Column from "./Column";
import Card from "./Card";
import { TICKET_STATUS, COLUMNS } from "../constants";
import AddNewTicket from "./Modals/AddNewTicket";
import EditTicket from "./Modals/EditTicket";

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [editModalIsOpen, setIsOpenEdit] = useState(false);

  const db = useFirestore();

  const fetchTickets = async () => {
    if (db) {
      const querySnapshot = await getDocs(collection(db, "tickets"));
      const tickets = [];
      querySnapshot.forEach((doc) => {
        tickets.push({ _id: doc.id, ...doc.data() });
      });
      setTasks(tickets);
    }
  }

  const updateDocument = async (id, ticket) => {
    try {
      const docRef = doc(db, "tickets", id);
      await updateDoc(docRef, ticket);
      return { _id: id, ...ticket };
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    fetchTickets();
  }, [db])

  const changeTaskStatus = useCallback(
    (id, status) => {
      let task = tasks.find((task) => task._id === id);
      const taskIndex = tasks.indexOf(task);
      task = { ...task, status };
      updateDocument(task._id, task);
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task },
      });
      setTasks(newTasks);
    },
    [tasks]
  );

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openEditModal = (ticket) => {
    setSelected(ticket);
    setIsOpenEdit(true)
  }

  const closeEditModal = () => {
    setSelected(null);
    setIsOpenEdit(false);
  }

  const onCreateNewTicket = async (ticket) => {
    const newTicket = {
      ...ticket,
      status: TICKET_STATUS[0],
    };

    try {
      const docRef = await addDoc(collection(db, "tickets"), newTicket);
      console.log("Document written with ID: ", docRef.id);
      setTasks([...tasks, { _id: docRef.id, ...newTicket }]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onEditTicket = async (ticket) => {
    const taskIndex = tasks.indexOf(selected);
    const updatedTicket = await updateDocument(selected._id, { ...ticket, status: selected.status });

    if (updatedTicket) {
      let newTasks = update(tasks, {
        [taskIndex]: { $set: updatedTicket },
      });
      setTasks(newTasks);
    }
  };

  return (
    <main className="min-h-screen">
      <header className="flex justify-between mx-auto w-[90%] py-5">
        <h1 className="text-3xl">
          Kanban board Test App - React, react-dnd, reactfire{" "}
        </h1>
        <button
          type="button"
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={openModal}
        >
          + Create New Ticket
        </button>
      </header>
      <DndProvider backend={HTML5Backend}>
        <section className="flex mx-auto w-[90%] h-full space-x-2">
          {TICKET_STATUS.map((status) => (
            <Column
              key={status}
              status={status}
              changeTaskStatus={changeTaskStatus}
            >
              <h2 className="text-center font-bold text-xl p-3">
                {COLUMNS[status]}
              </h2>
              <div>
                {tasks
                  .filter((item) => item.status === status)
                  .map((item) => (
                    <Card key={item._id} id={item._id}>
                      <div className="flex flex-col text-left">
                        <div className="flex w-full justify-between items-center">
                          <h3 className="text-md font-bold">{item.title}</h3>
                          <svg
                            width="11"
                            height="10"
                            viewBox="0 0 11 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => openEditModal(item)}
                          >
                            <path
                              d="M0.967773 7.62297V9.49797H2.84277L8.37277 3.96797L6.49777 2.09297L0.967773 7.62297ZM10.1728 2.16797L8.29777 0.292969L7.03277 1.56297L8.90777 3.43797L10.1728 2.16797Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <p className="truncate-desc">{item.description}</p>
                      </div>
                    </Card>
                  ))}
              </div>
            </Column>
          ))}
        </section>
      </DndProvider>
      {modalIsOpen && (
        <AddNewTicket
          open={modalIsOpen}
          onClose={closeModal}
          onConfirm={onCreateNewTicket}
        />
      )}
      {editModalIsOpen && selected && (
        <EditTicket
          open={editModalIsOpen}
          ticket={selected}
          onClose={closeEditModal}
          onConfirm={onEditTicket}
        />
      )}
    </main>
  );
};

export default Kanban;
