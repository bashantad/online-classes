FactoryBot.define do
  factory :user do
    full_name { "John Doe" }
    email  { "john.doe@gmail.com" }
    password { "password@1" }
    confirmed_at { Time.now }
    call_limit_per_month { 5 }
    is_admin { false }
  end
end