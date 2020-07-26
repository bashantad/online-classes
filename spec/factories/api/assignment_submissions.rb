FactoryBot.define do
  factory :api_assignment_submission, class: 'Api::AssignmentSubmission' do
    description { "MyText" }
    user { nil }
    assignment { nil }
  end
end
