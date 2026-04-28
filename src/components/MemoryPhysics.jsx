import { useEffect, useRef } from "react";
import Matter from "matter-js";

const labels = [
  { lines: ["Angelina"], radius: 48 },
  { lines: ["06.10"], radius: 42 },
  { lines: ["greenish", "brown eyes", "(blue eyes)"], radius: 72 },
  { lines: ["playlist", "walks"], radius: 58 },
  { lines: ["wish"], radius: 44 },
  { lines: ["love"], radius: 42 },
  { lines: ["snow"], radius: 44 },
  { lines: ["pookie"], radius: 48 },
  { lines: ["home", "walks"], radius: 50 },
];

export default function MemoryPhysics() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.015 } });
    const render = Matter.Render.create({
      element: host,
      engine,
      options: {
        width: host.clientWidth,
        height: host.clientHeight,
        wireframes: false,
        background: "transparent",
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
    });

    const makeBounds = () => {
      const { width, height } = render.options;
      return [
        Matter.Bodies.rectangle(width / 2, -34, width + 100, 68, {
          isStatic: true,
          render: { visible: false },
        }),
        Matter.Bodies.rectangle(width / 2, height + 34, width + 100, 68, {
          isStatic: true,
          render: { visible: false },
        }),
        Matter.Bodies.rectangle(-34, height / 2, 68, height + 140, {
          isStatic: true,
          render: { visible: false },
        }),
        Matter.Bodies.rectangle(width + 34, height / 2, 68, height + 140, {
          isStatic: true,
          render: { visible: false },
        }),
      ];
    };

    let bounds = makeBounds();
    const bodies = labels.map((label, index) => {
      const x = 90 + ((index * 137) % Math.max(240, render.options.width - 120));
      const y = 90 + ((index * 91) % Math.max(260, render.options.height - 160));
      const body = Matter.Bodies.circle(x, y, label.radius, {
        restitution: 1,
        friction: 0,
        frictionAir: 0.003,
        label: label.lines.join(" "),
        render: {
          fillStyle: [
            "rgba(248, 252, 255, 0.78)",
            "rgba(223, 240, 255, 0.76)",
            "rgba(201, 221, 255, 0.72)",
            "rgba(231, 220, 255, 0.72)",
            "rgba(255, 255, 255, 0.76)",
            "rgba(217, 244, 255, 0.72)",
          ][index % 6],
          strokeStyle: "rgba(35, 58, 117, 0.13)",
          lineWidth: 1,
        },
      });

      body.memoryLines = label.lines;
      Matter.Body.setVelocity(body, {
        x: (index % 2 ? 1 : -1) * (1.4 + (index % 3) * 0.35),
        y: (index % 3 ? 1 : -1) * (1.1 + (index % 4) * 0.25),
      });
      Matter.Body.setAngularVelocity(body, (index % 2 ? 1 : -1) * 0.018);
      return body;
    });

    const mouseBody = Matter.Bodies.circle(-100, -100, 82, {
      isStatic: true,
      render: { visible: false },
    });

    Matter.Composite.add(engine.world, [...bounds, ...bodies, mouseBody]);
    Matter.Render.run(render);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const afterRender = () => {
      const context = render.context;
      context.save();
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#233a75";

      bodies.forEach((body) => {
        const lines = body.memoryLines ?? [body.label];
        const fontSize = lines.length > 1 ? 12 : 14;
        const lineHeight = fontSize + 2;
        const startY = -((lines.length - 1) * lineHeight) / 2;

        context.save();
        context.translate(body.position.x, body.position.y);
        context.rotate(body.angle);
        context.font = `800 ${fontSize}px Inter, sans-serif`;
        lines.forEach((line, lineIndex) => {
          context.fillText(line, 0, startY + lineIndex * lineHeight);
        });
        context.restore();
      });

      context.restore();
    };

    Matter.Events.on(render, "afterRender", afterRender);

    const impulseTimer = window.setInterval(() => {
      const body = bodies[Math.floor(Math.random() * bodies.length)];
      if (!body) return;

      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.035,
        y: (Math.random() - 0.65) * 0.04,
      });
    }, 1250);

    const handlePointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      Matter.Body.setPosition(mouseBody, {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    const handleResize = () => {
      render.canvas.width = host.clientWidth * render.options.pixelRatio;
      render.canvas.height = host.clientHeight * render.options.pixelRatio;
      render.canvas.style.width = `${host.clientWidth}px`;
      render.canvas.style.height = `${host.clientHeight}px`;
      render.options.width = host.clientWidth;
      render.options.height = host.clientHeight;
      Matter.Composite.remove(engine.world, bounds);
      bounds = makeBounds();
      Matter.Composite.add(engine.world, bounds);
    };

    host.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.clearInterval(impulseTimer);
      host.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      Matter.Events.off(render, "afterRender", afterRender);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div className="physics-field" ref={hostRef} aria-hidden="true" />;
}
