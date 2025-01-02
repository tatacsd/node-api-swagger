import z from "zod";
import { FastifyTypedInstance } from "./types";
import { randomUUID } from "node:crypto";

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

// Using FastifyTypedInstance instead of FastifyInstance to enable zod validation for the schema of the routes
export async function routes(app: FastifyTypedInstance): Promise<void> {
  app.get(
    "/users",
    {
      schema: {
        description: "List all users",
        tags: ["users"], // good to grup the routes inside the swagger documentation
        response: {
          200: z
            .object({
              users: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  email: z.string().email(),
                })
              ),
            })
            .describe("List of users"),
        },
      },
    },
    () => {
      return { users: [] };
    }
  );

  app.post(
    "/users",
    {
      schema: {
        description: "Create a new user",
        tags: ["users"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z
            .object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
            })
            .describe("User created successfully"),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      users.push(user);

      return reply.code(201).send(user);
    }
  );

  app.patch(
    "/users/:id",
    {
      schema: {
        description: "Update a user",
        tags: ["users"],
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
        }),
        response: {
          200: z
            .object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
            })
            .describe("User updated successfully"),
          404: z
            .object({
              message: z.string(),
            })
            .describe("User not found"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, email } = request.body;

      const user = users.find((user) => user.id === id);

      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }

      if (name) {
        user.name = name;
      }

      if (email) {
        user.email = email;
      }

      return user;
    }
  );

  app.put(
    "/users/:id",
    {
      schema: {
        description: "Update a user",
        tags: ["users"],
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          200: z
            .object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
            })
            .describe("User updated successfully"),
            404: z
            .object({
              message: z.string(),
            }).describe("User not found"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, email } = request.body;

      const user = users.find((user) => user.id === id);

      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }

      user.name = name;
      user.email = email;

      return user;
    }
  );

  app.get(
    "/users/:id",
    {
      schema: {
        description: "Get a user",
        tags: ["users"],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z
            .object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
            })
            .describe("User found"),
          404: z
            .object({
              message: z.string(),
            })
            .describe("User not found"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const user = users.find((user) => user.id === id);

      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }

      return user;
    }
  );

  app.delete(
    "/users/:id",
    {
      schema: {
        description: "Delete a user",
        tags: ["users"],
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z
            .object({
              message: z.string(),
            })
            .describe("User deleted successfully"),
            404: z
            .object({
              message: z.string(),
            }).describe("User not found"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        return reply.code(404).send({ message: "User not found" });
      }

      users.splice(userIndex, 1);

      return reply.code(204).send();
    }
  );
}
