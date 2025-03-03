import {belongsTo, createServer, hasMany, Model, Response} from 'miragejs';

export function makeServer({environment = 'development'} = {}) {
    return createServer({
        environment,

        models: {
            question: Model.extend({
                choice: hasMany(),
            }),
            questionType: Model,
            choice: Model.extend({
                question: belongsTo(),
            })
        },
        seeds(server) {
            server.create("questionType", {id: 1, name: "Select"});
            server.create("questionType", {id: 2, name: "Checkbox"});
            server.create("questionType", {id: 3, name: "Radio"});
            server.create("choice", {id: 1, text: "Option 1", order: 1});
        },
        routes() {
            this.namespace = 'api';

            this.get("/questionTypes", (schema) => {
                return schema.questionTypes.all();
            });

            this.post('/questions', (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                if (!attrs.questionText || !attrs.questionType) {
                    return new Response(400, {}, {error: 'Invalid question data'});
                }
                const allChoices = schema.choices.all();
                let lastChoiceId = 0;
                if (allChoices.length > 0) {
                    lastChoiceId = Math.max(...allChoices.models.map((c) => c.id));
                }
                const newChoices = attrs.choices.map((choice, index) => ({
                    ...choice,
                    id: lastChoiceId + index + 1,
                }));
                return schema.questions.create({
                    ...attrs,
                    choices: newChoices
                });
            });

            this.get('/questions/:id', (schema, request) => {
                let id = request.params.id;
                let question = schema.questions.find(id);
                if (!question) {
                    return new Response(404, {}, {error: "Question not found"});
                }
                return question;
            });

            this.passthrough();
            this.timing = 400;
        },
    });
}