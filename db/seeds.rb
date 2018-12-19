# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

start = Time.now

# Rake::Task['db:drop'].invoke
# Rake::Task['db:create'].invoke
Rake::Task['db:migrate'].invoke

@boards = [
  {
    name: 'General',
    general: true,
    id: 1
  },
  {
    name: 'Priorities',
    general: false,
    id: 2
  }
]

@columns = [
  {
    name: 'Done',
    position: 0,
    board_id: 1
  },
  {
    name: 'In Progress',
    position: 1,
    board_id: 1
  },
  {
    name: 'Priority',
    position: 2,
    board_id: 1
  },
  {
    name: 'To Do',
    position: 3,
    board_id: 1
  },
  {
    name: 'Waiting',
    position: 4,
    board_id: 1
  },
  {
    name: 'Backlog',
    position: 5,
    board_id: 1
  },
  {
    name: 'Inbox',
    position: 0,
    board_id: 1
  },
  {
    name: 'High Priority',
    position: 1,
    board_id: 2
  },
  {
    name: 'Medium Priority',
    position: 2,
    board_id: 2
  },
  {
    name: 'Low Priority',
    position: 3,
    board_id: 2
  },
  {
    name: 'No Priority',
    position: 4,
    board_id: 2
  }
]

def create_board(board)
  Board.create(
    name: board[:name],
    general: board[:general],
    id: board[:id]
  )
end

def create_column(column)
  Column.create(
    name: column[:name],
    position: column[:position],
    board_id: column[:board_id]
  )
end

@boards.each do |board|
  b = create_board(board)
  puts "Board #{b.name} created"
end

# @columns.each do |column|
#   c = create_column(column)
#   puts "Column #{c.name} created"
# end

finish = Time.now
duration = finish - start
puts "Task completed in #{duration}"
