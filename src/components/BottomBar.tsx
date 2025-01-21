"use client";
import React, { useState } from 'react'

// Compnoents
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

// Emoji Picker
import EmojiPicker,
{
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
  Theme,
} from 'emoji-picker-react';

// Icons
import { MdOutlineEmojiEmotions } from "react-icons/md";

export default function BottomBar() {
  const [emojiOpened, setEmojiOpened] = useState(false);

  const [message, setMessage] = useState("");

  const emojiClicked = (emojiData: EmojiClickData) => {
    setMessage(prevousString => prevousString + emojiData.emoji);
  }

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <div
      className='relative w-full'>
      {/* Text Bar */}
      <div
        className='fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex flex-row items-center justify-start px-2 gap-2'>

        {/* Text Input */}
        <div
          className='w-full relative'>
          <Input
            className='border border-gray-300 outline-none focus:outline-none pr-10'
            placeholder='Enter message...'
            value={message}
            onChange={changeText} />
          <div
            className='h-full absolute top-0 right-0 flex flex-col items-center justify-center pr-3'>
            <MdOutlineEmojiEmotions
              onClick={() => setEmojiOpened(!emojiOpened)}
              className="text-2xl" />
          </div>

        </div>
        <div
          className=''>
          <Button>
            Send
          </Button>
        </div>
      </div>
      {/* Emoji Picker */}
      <div
        style={{
          display: !emojiOpened ? "none" : ""
        }}
        className='w-96 fixed bottom-20 right-0'>
        <EmojiPicker
          open={emojiOpened}
          theme={Theme.LIGHT}
          emojiStyle={EmojiStyle.APPLE}
          suggestedEmojisMode={SuggestionMode.FREQUENT}
          searchDisabled={true}
          skinTonesDisabled={true}
          lazyLoadEmojis={false}
          onEmojiClick={emojiClicked}
          height={500}
          width={"90%"} />
      </div>
    </div>

  )
}
