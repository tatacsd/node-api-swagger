import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod';
import { fastifySwagger} from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { routes } from './routes';

const app = fastify().withTypeProvider<ZodTypeProvider>();

// Use zod to validate all entries data
app.setValidatorCompiler(validatorCompiler);

// Use zod to serialize all output data
app.setSerializerCompiler(serializerCompiler);


// Enable CORS for all routes
app.register(fastifyCors, {
  origin: '*'
});

// Enable swagger documentation
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Backend API Documentation',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform,
});

// Enable swagger ui
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});

// Register routes
app.register(routes);

app.listen({port: 3333}).then(() => {
    console.log('Server is running on http://localhost:3333');
    }
);