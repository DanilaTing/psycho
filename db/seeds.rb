# TIP: Comment the line 'after_create :attach_to_user' in card.rb before seed

Rake::Task['db:drop'].invoke
Rake::Task['db:create'].invoke
Rake::Task['db:migrate'].invoke

User.create!([
  {email: "test@test.com", password: 'testtest', encrypted_password: "$2a$11$6fmfrG5VIcbg16haXzgieew/O5sHbqDw.1WXMm8RhgLmnncuUuaLK", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil}
])

Card.create!([
  {name: "New Task In Inbox", description: "", type: "Task", project_id: nil, user_id: 1},
  {name: "New Task In To Do", description: "", type: "Task", project_id: nil, user_id: 1},
  {name: "New Project", description: nil, type: "Project", project_id: nil, user_id: 1},
  {name: "New Task In Project", description: "", type: "Task", project_id: 3, user_id: 1}
])

CardInColumn.create!([
  {column_id: 7, card_id: 1, user_id: 1},
  {column_id: 3, card_id: 2, user_id: 1},
  {column_id: 7, card_id: 3, user_id: 1},
  {column_id: 4, card_id: 4, user_id: 1}
])
