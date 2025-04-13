import {
  hasScreenShare,
  useCall,
  useCallStateHooks,
  ParticipantView,
} from "@stream-io/video-react-sdk";

export const SpeakerView = () => {
  const call = useCall();
  const { useParticipants } = useCallStateHooks();
  const [participantInSpotlight, ...otherParticipants] = useParticipants();

  return (
    // enables the default styling for the video SDK
    <div className="speaker-view">
      {call && otherParticipants.length > 0 && (
        <div className="participants-bar">
          {otherParticipants.map((participant) => (
            <div className="participant-tile" key={participant.sessionId}>
              <ParticipantView participant={participant} />
            </div>
          ))}
        </div>
      )}

      <div className="spotlight">
        {call && participantInSpotlight && (
          <ParticipantView
            participant={participantInSpotlight}
            trackType={
              hasScreenShare(participantInSpotlight)
                ? "screenShareTrack"
                : "videoTrack"
            }
          />
        )}
      </div>
    </div>
  );
};
