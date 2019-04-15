# TIP: Comment the line 'after_create :attach_to_user' in card.rb before seed

Rake::Task['db:drop'].invoke
Rake::Task['db:create'].invoke
Rake::Task['db:migrate'].invoke

@tasks = [
  'Вынести мусор', 'Тиснуть кота', 'Залипнуть',
  'Прогуляться', 'Пописать', 'Думать умные мысли',
  'Понести херню'
]

@projects = [
  'Поездка в лето', 'Поездка в зиму', 'Стать рэпером',
  'Забить на жизнь', 'Сделать проект'
]

def seed_data
  create_user
  create_projects
  create_tasks
end

def create_user
  u = User.create!(
    email: 'test@test.com',
    password: 'testtest',
    password_confirmation: 'testtest'
  )

  puts "User with email #{ u.email } created"
end

def create_projects
  user = User.first

  @projects.each do |p|
    random_column_from_general_board = user.boards.find_by_name('General').columns.sample
    random_column_from_priorities_board = user.boards.find_by_name('Priorities').columns.sample

    project = random_column_from_general_board.projects.create!(name: p, user_id: user.id)
    puts "Project with name #{ project.name } created"
    puts "#{ project.to_json }"

    card_in_column = CardInColumn.create!(
      columnable_type: 'Project',
      columnable_id: project.id,
      column_id: random_column_from_priorities_board.id
    )

    puts "CardInColumn created"
    puts "#{ card_in_column.to_json }"
  end

  puts "#{ CardInColumn.all.to_json }"
end

def create_tasks
  user = User.find_by_email('test@test.com')

  @tasks.each do |p|
    random_column_from_general_board = user.boards.find_by_name('General').columns.sample
    random_column_from_priorities_board = user.boards.find_by_name('Priorities').columns.sample
    random_project = user.projects.sample

    task = random_column_from_general_board.tasks.create!(name: p, user_id: user.id, project_id: random_project.id)
    puts "Task with name #{ task.name } created"
    puts "#{ task.to_json }"

    card_in_column = CardInColumn.create!(
      columnable_type: 'Task',
      columnable_id: task.id,
      column_id: random_column_from_priorities_board.id
    )

    puts "CardInColumn created"
    puts "#{ card_in_column.to_json }"
  end

  puts "#{ CardInColumn.all.to_json }"
end

seed_data
