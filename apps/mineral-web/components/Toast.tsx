import useUIZStore from 'utils/useUIZStore';
import { motion } from 'motion/react';

const Toast = () => {
  const { notifications } = useUIZStore();

  const renderedNots = notifications.map((n) => (
    <motion.div
      className="w-72 rounded border border-[var(--border-soft-color)] bg-[var(--solid-bg-color)] p-2 text-center font-mono text-sm text-[var(--success-color)]"
      key={n.id}
      animate={{ y: [-100, 0] }}
      transition={{ duration: 0.5 }}
    >
      {n.children}
    </motion.div>
  ));

  return (
    // TO-DO: If this element has padding it prevents clicks on elements behind
    // it. This is a problem for the menu button in the note menu.
    <div
      className={`notifs fixed top-10 z-20 flex w-full flex-col items-center space-y-2`}
    >
      {renderedNots}
    </div>
  );
};

export default Toast;
