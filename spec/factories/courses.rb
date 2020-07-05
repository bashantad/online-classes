FactoryBot.define do
  factory :course do
    title { "Python Fundamentals" }
    body { "Lorem ipsum" }
    user_id { FactoryBot.create(:user).id }
    website { "www.google.com" }
    course_for { 'Grads' }
    category_id { FactoryBot.create(:category).id }
    price { 20.5 }
  end
end
