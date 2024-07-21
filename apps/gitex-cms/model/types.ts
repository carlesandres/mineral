import { Example } from '@/types/Example';
import type { BaseCommand } from 'types/BaseCommand';

export interface SupabaseExampleRowExtended extends Example {
  base_commands: BaseCommand;
}
