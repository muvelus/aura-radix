import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Network } from 'lucide-react';
import { threadGenealogyData } from '../../dummydata';

export default function ThreadGenealogy({ mention, open, onOpenChange }) {
  if (!mention) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl max-h-[85vh] bg-card border border-border rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <Dialog.Title className="text-xl font-semibold flex items-center gap-2">
                  <Network className="w-5 h-5 text-primary" />
                  Thread Genealogy
                </Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mt-1">
                  Interactive conversation flow visualization
                </Dialog.Description>
              </div>
              <Dialog.Close className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>
          </div>

          {/* Thread Visualization */}
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-4">
              {threadGenealogyData.nodes.map((node, index) => (
                <div
                  key={node.id}
                  className={`relative ${
                    node.parent ? 'ml-8' : ''
                  }`}
                >
                  {node.parent && (
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border" 
                         style={{ left: '-2rem', height: 'calc(100% + 1rem)' }} />
                  )}
                  <div className={`p-4 rounded-lg border ${
                    node.type === 'original' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border bg-card'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center text-xs font-bold">
                        {node.author[0]}
                      </div>
                      <span className="font-medium text-sm">{node.author}</span>
                      {node.type === 'original' && (
                        <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded">
                          Original Post
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground pl-8">
                      {node.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 p-4 bg-accent/30 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{threadGenealogyData.nodes.length}</div>
                  <div className="text-xs text-muted-foreground">Total Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{threadGenealogyData.nodes.filter(n => n.type === 'reply').length}</div>
                  <div className="text-xs text-muted-foreground">Replies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{new Set(threadGenealogyData.nodes.map(n => n.author)).size}</div>
                  <div className="text-xs text-muted-foreground">Participants</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border flex justify-end">
            <Dialog.Close asChild>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
