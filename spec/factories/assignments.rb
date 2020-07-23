FactoryBot.define do
  factory :assignment do
    question { "MyString" }
    instructions { "MyText" }
    points { 1 }
    due { "2020-07-22 20:19:27" }
    chapter { nil }
  end
end
