import React, { useState, useEffect } from "react";
import EventCardForm from "./EventCardForm.jsx";
import "../../css/EventCardForm.css";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingEventData, setEditingEventData] = useState(null);

  useEffect(() => {
    fetch("https://u-event-frontend-20ddc44bb59c.herokuapp.com/api/events")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch events.");
        }
        return res.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const deleteEvent = (id) => {
    fetch(`https://u-event-frontend-20ddc44bb59c.herokuapp.com/api/events/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete event.");
        }
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.eventId !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const startEditingEvent = (event) => {
    setEditingEventId(event.eventId);
    setEditingEventData(event);
  };

  const handleEditChange = (name, value) => {
    setEditingEventData((previousData) => {
      if (name.startsWith("user.")) {
        const userFieldName = name.split(".")[1];
        return {
          ...previousData,
          user: {
            ...previousData.user,
            [userFieldName]: value,
          },
        };
      }
      return {
        ...previousData,
        [name]: value,
      };
    });
  };

  const handleEditSubmit = (id) => {
    fetch(`https://u-event-frontend-20ddc44bb59c.herokuapp.com/api/events/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingEventData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update event.");
        }
        return res.json();
      })
      .then((updatedEvent) => {
        setEvents((previousEvents) =>
          previousEvents.map((event) =>
            event.eventId === id ? updatedEvent : event
          )
        );
        setEditingEventId(null);
        setEditingEventData(null);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="manage-events-container">
      <div className="manage-events-main-container">
        <div className="manage-events-header">
          <h1>Manage Events</h1>
        </div>
        <div className="manage-events-body">
          {events.map((event) => (
            <div key={event.eventId}>
              {editingEventId === event.eventId ? (
                <EventCardForm
                  {...editingEventData}
                  onSubmit={() => handleEditSubmit(event.eventId)}
                  onChange={handleEditChange}
                  width={380}
                  isEdit={isEdit}
                />
              ) : (
                <>
                  <EventCardForm {...event} width={400} />
                  <button onClick={() => deleteEvent(event.eventId)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setIsEdit(true);
                      startEditingEvent(event);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
