import { createServer, Model, Response } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      surveys: Model,
      answers: Model,
    },

    seeds(server) {
      server.db.loadData({
        surveys: {
          id: "2660dd24-e2db-42c1-8093-284b1df2664c",
          type: "surveys",
          attributes: {
            title: "Film feedback form",
            description:
              "<p>Thank you for participating in the film festival!</p><p>Please fill out this short survey so we can record your feedback.</p>",
            questions: [
              {
                questionId: "film",
                questionType: "text",
                label: "What film did you watch?",
                required: true,
                attributes: null,
              },
              {
                questionId: "review",
                questionType: "range",
                label:
                  "How would you rate the film? (1 - Very bad, 5 - Very good)",
                required: true,
                attributes: {
                  min: 1,
                  max: 5,
                },
              },
            ],
          },
        },
      });
    },

    routes() {
      this.namespace = "/api/v1";

      this.get("/survey", (schema) => {
        const survey = schema.surveys.first();
        if (!survey) {
          return new Response(
            500,
            {},
            {
              errors: [
                {
                  title: "Internal Server Error",
                  detail: "Something went wrong. We're working on it!",
                },
              ],
            }
          );
        }
        return survey.attrs;
      });

      this.post("/survey/:id/answers", (schema, request) => {
        const surveyId = request.params.id;
        const formData = JSON.parse(request.requestBody);
        const survey = schema.surveys.where({ id: surveyId });
        schema.answers.create({ surveyId, answers: formData });

        if (!formData.film || !formData.review) {
          return new Response(
            422,
            {},
            {
              errors: [
                {
                  source: { pointer: "data/attributes/answers/film" },
                  detail: "The value is required",
                },
                {
                  source: { pointer: "data/attributes/answers/review" },
                  detail: "The value is required",
                },
              ],
            }
          );
        }

        return {
          data: {
            type: "surveyAnswers",
            id: surveyId,
            attributes: {
              answers: [
                { questionId: "film", answer: formData.film },
                { questionId: "review", answer: formData.review },
              ],
            },
            relationships: {
              survey: survey.models[0],
            },
          },
        };
      });
    },
  });

  return server;
}
