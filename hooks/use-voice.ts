import axios from "axios";
import { useState, useRef } from "react";

export const useVoiceToGroq = () => {
  const [recording, setRecording] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    console.log("stream");
    console.log(stream);
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      await handleTranscription(audioBlob);
      console.log("audioBlob");
      console.log(audioBlob);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const handleTranscription = async (audioBlob: Blob) => {
    setLoading(true);
    setResponse("");

    const whisperForm = new FormData();
    whisperForm.append("file", audioBlob, "recording.webm");
    whisperForm.append("model", "whisper-1");

    const whisperRes = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY!}`,
        },
        body: whisperForm,
      }
    );

    const whisperData = await whisperRes.json();
    const userText = whisperData.text;
    console.log("whisperData");
    console.log(userText);
    console.log(whisperData);

    const res = await axios.post("/api/chat", {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userText },
      ],
      model: "mixtral-8x7b-32768",
    });

    setResponse(res.data.content);
    setLoading(false);
  };

  return {
    recording,
    response,
    loading,
    startRecording,
    stopRecording,
  };
};
