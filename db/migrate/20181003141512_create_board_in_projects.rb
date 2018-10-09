class CreateBoardInProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :board_in_projects do |t|
      t.integer :board_id
      t.integer :project_id

      t.timestamps
    end
  end
end
