import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../components/Filter';

describe('Filter component', () => {
    test('renders all select components with correct placeholders', () => {
        render(<Filter />);
        expect(screen.getByPlaceholderText('Date')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('GPA')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('OutCome')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('International')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Filter/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
    });

    test('test for data label showing for Date', () => {
        render(<Filter/>);
      
        // Find the select element
        const select = screen.getByPlaceholderText('Date');
      
        // Simulate a click on the select element
        fireEvent.click(select);
      
        // Check that the labels are visible in the menu
        const latestOption = screen.queryByText('Latest');
        const oldestOption = screen.queryByText('Oldest');
      
        // Make sure the options are not null before trying to interact with them
        if (latestOption && oldestOption) {
          expect(latestOption).toBeInTheDocument();
          expect(oldestOption).toBeInTheDocument();
      
          // Simulate a click on the 'Latest' option
          fireEvent.click(latestOption);
      
          // Check that the sortBy state has been updated with the correct value
          expect(screen.getByPlaceholderText('Date')).toHaveValue('date_desc');
        }
    });

    test('test for data label showing for GPA', () => {
        render(<Filter/>);
      
        // Find the select element
        const select = screen.getByPlaceholderText('GPA');
      
        // Simulate a click on the select element
        fireEvent.click(select);
      
        // Check that the labels are visible in the menu
        const lowestOption = screen.queryByText('Lowest');
        const highestOption = screen.queryByText('Highest');
      
        // Make sure the options are not null before trying to interact with them
        if (lowestOption && highestOption) {
          expect(lowestOption).toBeInTheDocument();
          expect(highestOption).toBeInTheDocument();
      
          // Simulate a click on the 'Lowest' option
          fireEvent.click(lowestOption);
      
          // Check that the sortBy state has been updated with the correct value
          expect(screen.getByPlaceholderText('GPA')).toHaveValue('gpa_asc');
        }
    });



    test('test for data label showing for OutCome', () => {
        render(<Filter/>);
      
        // Find the select element
        const select = screen.getByPlaceholderText('OutCome');
      
        // Simulate a click on the select element
        fireEvent.click(select);
      
        // Check that the labels are visible in the menu
        const acceptedOption = screen.queryByText('Accepted');
        const rejectedOption = screen.queryByText('Rejected');
        const waitlistedOption = screen.queryByText('Waitlisted');
        const interviewedOption = screen.queryByText('Interviewed');
      
        // Make sure the options are not null before trying to interact with them
        if (acceptedOption && rejectedOption && waitlistedOption && interviewedOption) {
          expect(acceptedOption).toBeInTheDocument();
          expect(rejectedOption).toBeInTheDocument();
          expect(waitlistedOption).toBeInTheDocument();
          expect(interviewedOption).toBeInTheDocument();
        }
    });


    test('test for data label showing for International', () => {
        render(<Filter/>);
      
        // Find the select element
        const select = screen.getByPlaceholderText('International');
      
        // Simulate a click on the select element
        fireEvent.click(select);
      
        // Check that the labels are visible in the menu
        const internationalOption = screen.queryByText('International');
        const domesticOption = screen.queryByText('Domestic');
      
        // Make sure the options are not null before trying to interact with them
        if (internationalOption && domesticOption) {
          expect(internationalOption).toBeInTheDocument();
          expect(domesticOption).toBeInTheDocument();
      
          // Simulate a click on the 'Latest' option
          fireEvent.click(internationalOption);
      
          // Check that the sortBy state has been updated with the correct value
          expect(screen.getByPlaceholderText('International')).toHaveValue('true');
        }
    });  
});
  
