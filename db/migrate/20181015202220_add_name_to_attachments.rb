class AddNameToAttachments < ActiveRecord::Migration[5.1]
  def change
    add_column :attachments, :name, :string
  end
end
