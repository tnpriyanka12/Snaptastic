class CreateSnaps < ActiveRecord::Migration[5.1]
  def change
    create_table :snaps do |t|
      t.text :snap
      t.string :snap_name
      t.integer :user_id

      t.timestamps
    end
  end
end
