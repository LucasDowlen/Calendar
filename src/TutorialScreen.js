import React from 'react';

function TutorialScreen({ onDelete }) {
    return (
        <div className="tutorialContainer" onClick={onDelete}>
            <div clssName="tutorialWindow">
                <h1>Basic Controls</h1>
                <section>
                    <h2>Adding an Element</h2>
                    <h3>
                        To add an event to a certian day, simply double click on the day you have something planned. Doing so will allow you to 
                        give a name to the even as well as give a location or time.
                    </h3>
                </section>

                <section>
                    <h2>Giving Specific start and End Times</h2>
                    <h3>
                        To specify a start time simply put in a time when entering the event. This defaults to one hour. If you wish to specify
                        a length you man check the "span" box and input an end time. 
                    </h3>
                </section>

                <section>
                    <h2>Entering Single Day View</h2>
                    <h3>To enter the single day view double click on the number of the respective day. This will allow you to visualize
                        everything planned for that day in a neat way.
                    </h3>
                </section>

                <section>
                    <h3 className="Exit">Click Anywhere to Exit This Menu</h3>
                </section>
            </div>
        </div>
    )
}

export default TutorialScreen;