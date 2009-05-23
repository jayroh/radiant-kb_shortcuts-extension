# Uncomment this if you reference any of your controllers in activate
# require_dependency 'application'

class KbShortcutsExtension < Radiant::Extension
  version "0.1"
  description "KB Shortcuts provide a quick way to save pages (in addition to save & coninue), in addition to other commonly used actions on the Page edit page(s)."
  url "http://github.com/jayroh"
  
  # define_routes do |map|
  #   map.namespace :admin, :member => { :remove => :get } do |admin|
  #     admin.resources :kb_shortcuts
  #   end
  # end
  
  def activate
    admin.page.edit.add :main, "hotkey_include"
  end
  
  def deactivate
    # admin.tabs.remove "Kb Shortcuts"
  end
  
end