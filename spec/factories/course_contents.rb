FactoryBot.define do
  factory :course_content, class: 'CourseContent' do
    title { "MyString" }
    description { "MyText" }
    duration { "MyString" }
    course { nil }
  end
end
