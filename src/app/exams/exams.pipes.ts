import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusIcon',
  standalone: true,
})
export class StatusIconPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'ongoing':
        return 'play-outline';
      case 'completed':
        return 'checkmark-circle-outline';
      case 'pending':
        return 'help-circle-outline';
      default:
        return 'help-circle-outline';
    }
  }
}

@Pipe({
  name: 'statusColor',
  standalone: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'ongoing':
        return 'warning';
      case 'completed':
        return 'success';
      case 'pending':
        return 'medium';
      default:
        return 'medium';
    }
  }
}

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
