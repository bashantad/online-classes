# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

return if Rails.env.production?
users = [
    User.create(full_name: 'Admin User', email: 'admin.user@gmail.com', password: 'password@1'),
    User.create(full_name: 'John Smith', email: 'john.smith@gmail.com', password: 'password@1'),
    User.create(full_name: 'Peter Larson', email: 'peter.larson@gmail.com', password: 'password@1'),
    User.create(full_name: 'Mark Aresty', email: 'mark.aresty@gmail.com', password: 'password@1'),
    User.create(full_name: 'Adrien Moore', email: 'adrien.moore@gmail.com', password: 'password@1'),
    User.create(full_name: 'Kevin Westley', email: 'kevin.westley@gmail.com', password: 'password@1')
]

users.each(&:confirm)

categories = [
    Category.create(title: 'Computer Science', description: 'Computer Science description', active: true),
    Category.create(title: 'Business', description: 'Business studies', active: true),
    Category.create(title: 'Finance and Accounting', description: 'Finance and Accounting', active: true)
]

category = categories.first
user = User.find(1)
courses = [
    category.courses.create(name: 'Python Programming', body: 'Python Programming fundamentals', website: 'https://google.com', price: 20.3, course_for: 'Recent Graduates', user_id: user.id),
    category.courses.create(name: 'java Fundamentals', body: 'Java fundamentals', website: 'https://google.com', price: 64.2, course_for: 'Recent Graduates', user_id: user.id),
    category.courses.create(name: 'Machine Learning', body: 'Machine Learning', website: 'https://google.com', price: 25.3, course_for: 'Recent Graduates', user_id: user.id)
]

courses[0..1].each(&:approve)
courses[0..1].each do |course|
  users[1..2].each do |user|
    course.enrolled_users << user
    course.general_conversation.users << user
  end
end

first_course = courses.first

users[3..5].each do |user|
  first_course.enrolled_users << user
  first_course.general_conversation.users << user
end