export default function Footer() {
  return (
    <div className="w-full p-4 bg-blue-900 bottom-0">
      <p className="text-white text-center text-sm md:text-base">
        Copyright 2023 <span className="font-bold text-cyan-300">CHITCHAT</span>
        <span className="hidden md:inline"> | Made with </span>
        <span className="text-cyan-300">❤️</span>
        <span className="hidden md:inline"> by </span>
        <span className="font-bold text-cyan-300">
          <a href="https://sahilparmar.in" className="hover:underline">SAHIL PARMAR</a>
        </span>
      </p>
    </div>
  );
}
