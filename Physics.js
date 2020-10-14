import Matter from "matter-js";

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let ball = entities.ball.body;
    let floor = entities.floor.body;

    engine.world.gravity.y = 10;
    Matter.Body.setVelocity(ball, {x: 5, y: 0} )
    


    touches.filter(t => t.type === "press").forEach(t => { Matter.Body.applyForce( ball, ball.position, {x:0.00, y: -0.10})
  });

    Matter.Engine.update(engine, time.delta);

    return entities;
};

export default Physics;