class CreateAttachments < ActiveRecord::Migration[5.1]
  def change
    create_table :attachments do |t|
      t.string  :type
      t.string  :image
      t.string  :name
      t.string  :link
      t.string  :video
      t.boolean :layout

      t.timestamps
    end
  end
end
