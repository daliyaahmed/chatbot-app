// components/MessageBubble.js



export default function MessageBubble({ message, isUser }) {
    return (
      <div className={` flex max-w-[70%] p-3 rounded-2xl mb-2 relative ${
        isUser ? 'bg-blue-500 text-white self-end rounded-br-none' : 'bg-gray-200 text-black self-start rounded-bl-none'
      }`}>
        <p>{message.text}</p>
        <span className="absolute bottom-[-18px] right-1 text-xs text-gray-500">{message.time}</span>
      </div>
    );
  }
