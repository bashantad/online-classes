FactoryBot.define do
  factory :note do
    title { "MyString" }
    description { "MyText" }
    user { nil }
    notebook { nil }
  end
end
